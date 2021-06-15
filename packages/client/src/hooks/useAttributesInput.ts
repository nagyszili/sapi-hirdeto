import { useState, useEffect } from 'react';

import errorMsg from '../../assets/texts/errors.json';
import texts from '../../assets/texts/texts.json';
import { AdByIdentifier_findAdByIdentifier } from '../apollo/types/AdByIdentifier';
import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../apollo/types/CategoriesByMainCategoryIdentifier';
import { AttributeValueInput } from '../apollo/types/graphql-global-types';
import { Element } from '../components/Filters/Select/SelectInput.props';
import { ATTRIBUTE_TYPES } from '../utils/constants';

interface Props {
  initialAttributes?: AttributeValueInput[] | null | undefined;
  selectedCategory?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  ad?: AdByIdentifier_findAdByIdentifier;
}

interface Error {
  key: string;
  error?: string;
}

export const useAttributesInput = ({
  initialAttributes,
  selectedCategory,
  ad,
}: Props) => {
  const [attributes, setAttributes] = useState<AttributeValueInput[]>(
    initialAttributes || []
  );
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    if (selectedCategory?.id === ad?.category.id) {
      initialAttributes && setAttributes(initialAttributes);
    } else {
      setAttributes([]);
    }
    setErrors([]);
  }, [selectedCategory]);

  useEffect(() => {
    initialAttributes && setAttributes(initialAttributes);
  }, [initialAttributes]);

  const removeAttribute = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => {
    setAttributes((oldAttributes) =>
      oldAttributes.filter(
        (oldAttribute) => oldAttribute.key !== attribute.title
      )
    );
  };

  const changeAttribute = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
    value: string
  ) => {
    setAttributes((oldAttributes) =>
      oldAttributes.map((oldAttribute) =>
        oldAttribute.key === attribute.title
          ? {
              ...oldAttribute,
              value:
                attribute.type === ATTRIBUTE_TYPES.RANGE
                  ? value.replace(/[^0-9]/g, '')
                  : value,
            }
          : oldAttribute
      )
    );
  };

  const addAttribute = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
    value: string
  ) => {
    setAttributes((oldAttributes) => [
      ...oldAttributes,
      {
        key: attribute.title,
        value:
          attribute.type === ATTRIBUTE_TYPES.RANGE
            ? value.replace(/[^0-9]/g, '')
            : value,
        type: attribute.type,
      },
    ]);
  };

  const onChangeAttribute =
    (
      attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
    ) =>
    (value: string) => {
      if (
        value === '' ||
        (attribute.type === ATTRIBUTE_TYPES.RANGE &&
          value.replace(/[^0-9]/g, '') === '')
      ) {
        removeAttribute(attribute);
        return;
      }

      if (attributes.find((attr) => attr.key === attribute.title)) {
        changeAttribute(attribute, value);
      } else {
        addAttribute(attribute, value);
      }

      setErrors((oldErrors) =>
        oldErrors?.filter((oldError) => oldError.key !== attribute.title)
      );
    };

  const getSelectedAttribute = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => attributes.find((attr) => attr.key === attribute.title)?.value;

  const getError = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => errors?.find((error) => error.key === attribute.title)?.error;

  const getAttributes = () => {
    const notFilledAttributes = selectedCategory?.attributes.filter(
      (attr) =>
        attr.required &&
        !attributes.find((attribute) => attr.title === attribute.key)
    );
    if (notFilledAttributes && notFilledAttributes.length > 0) {
      setErrors(
        notFilledAttributes.map((attr) => ({
          key: attr.title,
          error: errorMsg['validator.attributeError'],
        }))
      );
      return false;
    }

    return attributes;
  };

  const getPossibleValues = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => {
    let elements: Element[] = [{ label: texts['select'], value: '' }];
    if (attribute.dependsBy) {
      const dependentAttr = attributes.find(
        (selectedAttribute) => selectedAttribute.key === attribute.dependsBy
      );

      for (const possibleValue of attribute.possibleValues) {
        if (possibleValue.dependingKey === dependentAttr?.value) {
          elements = elements.concat(
            possibleValue.values.map((value) => ({
              label: value,
              value,
            }))
          );
        }
      }
    } else {
      elements = elements.concat(
        attribute.possibleValues[0].values.map((value) => ({
          label: value,
          value,
        }))
      );
    }
    return elements;
  };

  return {
    getAttributes,
    getError,
    getSelectedAttribute,
    onChangeAttribute,
    getPossibleValues,
  };
};
