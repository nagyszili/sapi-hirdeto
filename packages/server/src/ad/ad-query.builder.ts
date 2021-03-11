import { Injectable } from '@nestjs/common';
import { ATTRIBUTE_TYPES, ATTRIBUTE_NAMES, CURRENCY } from 'src/util/constants';
import { ExchangeRatesService } from 'src/exchange-rates/exchange-rates.calculator';
import { QueryParameters } from 'src/util/graphql-util-types/QueryParameters';
import { CategoryService } from 'src/category/category.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class AdQueryService {
  constructor(private categoryService: CategoryService) {}

  async getBaseQuery(queryParameters: QueryParameters) {
    return [
      {
        $match: {
          $and: [
            await this.getCategoryQuery(queryParameters),
            await this.getSearchStringQuery(queryParameters),
          ],
        },
      },
      await this.changePrice(queryParameters.currency),
      await this.getAdsFilterQuery(queryParameters),
    ];
  }

  async getAdsQuery(queryParameters: QueryParameters) {
    const baseQuery = await this.getBaseQuery(queryParameters);
    return [
      ...baseQuery,
      await this.getSort(queryParameters),
      await this.getSkip(queryParameters),
      await this.getLimit(queryParameters),
    ];
  }

  async getSort(queryParameters: QueryParameters) {
    return {
      $sort: {
        [queryParameters.sortField]: queryParameters.sortOrder,
        _id: 1,
      },
    };
  }

  async getSkip(queryParameters: QueryParameters) {
    return { $skip: queryParameters.page * queryParameters.perPage };
  }

  async getLimit(queryParameters: QueryParameters) {
    return { $limit: queryParameters.perPage };
  }

  async getSearchStringQuery(queryParameters: QueryParameters) {
    return queryParameters.queryString
      ? queryParameters.inDescription
        ? {
            description: {
              $regex: queryParameters.queryString,
              $options: 'i',
            },
          }
        : {
            name: {
              $regex: queryParameters.queryString,
              $options: 'i',
            },
          }
      : {};
  }

  async getCategoryQuery(queryParameters: QueryParameters) {
    const categories = queryParameters.mainCategoryIdentifier
      ? await this.categoryService.findCategoriesByMainCategoryIdentifier(
          queryParameters.mainCategoryIdentifier,
        )
      : [];

    const category =
      queryParameters.categoryIdentifier &&
      (await this.categoryService.findCategoryByIdentifier(
        queryParameters.categoryIdentifier,
      ));

    return queryParameters.categoryIdentifier && category
      ? { category: new ObjectId(category.id) }
      : queryParameters.mainCategoryIdentifier
      ? {
          category: {
            $in: categories.map((category) => new ObjectId(category.id)),
          },
        }
      : {};
  }

  async changePrice(currency: string) {
    const exchangeRates = await ExchangeRatesService.getRates();

    return currency === CURRENCY.EURO
      ? {
          $set: {
            price: {
              $cond: {
                if: { $eq: ['$currency', CURRENCY.EURO] },
                then: { $ceil: { $multiply: ['$price', 1] } },
                else: {
                  $ceil: {
                    $multiply: ['$price', exchangeRates.ronBased.rates.EUR],
                  },
                },
              },
            },
          },
        }
      : {
          $set: {
            price: {
              $cond: {
                if: { $eq: ['$currency', CURRENCY.LEI] },
                then: { $ceil: { $multiply: ['$price', 1] } },
                else: {
                  $ceil: {
                    $multiply: ['$price', exchangeRates.eurBased.rates.RON],
                  },
                },
              },
            },
          },
        };
  }

  async getAdsFilterQuery(queryParameters: QueryParameters) {
    return queryParameters.filters && queryParameters.filters.length > 0
      ? {
          $match: {
            $and: queryParameters.filters.map((filter) => {
              switch (filter.type) {
                case ATTRIBUTE_TYPES.RANGE: {
                  if (filter.name === ATTRIBUTE_NAMES.GENERAL.PRICE) {
                    return {
                      $expr: {
                        $and: [
                          { $gte: ['$price', filter.from || 0] },
                          { $lte: ['$price', filter.to || Infinity] },
                        ],
                      },
                    };
                  }

                  if (filter.from || filter.to) {
                    return {
                      attributeValues: {
                        $elemMatch: {
                          key: filter.name,
                          $and: [
                            { value: { $gte: filter.from || 0 } },
                            { value: { $lte: filter.to || Infinity } },
                          ],
                        },
                      },
                    };
                  }

                  return {};
                }
                case ATTRIBUTE_TYPES.SELECT:
                case ATTRIBUTE_TYPES.MULTI_SELECT:
                case ATTRIBUTE_TYPES.CHECKBOX: {
                  return {
                    attributeValues: {
                      $elemMatch: {
                        key: filter.name,
                        value: {
                          $in: filter.selectedAttributeValues,
                        },
                      },
                    },
                  };
                }
              }
            }),
          },
        }
      : { $match: {} };
  }
}
