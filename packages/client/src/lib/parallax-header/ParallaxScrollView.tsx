import React, { Component, ReactNode } from 'react';
import {
  Animated,
  Dimensions,
  View,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

const styles = require('./styles');

const window = Dimensions.get('window');

const pivotPoint = (a: number, b: number) => a - b;
const renderEmpty = () => <View />;
const noRender = () => <View style={{ display: 'none' }} />;
const interpolate = (
  value: { interpolate: (arg0: any) => any },
  opts: {
    inputRange: number[];
    outputRange: number[];
    extrapolate?: string;
    extrapolateRight?: string;
    extrapolateLeft?: string;
  }
) => {
  const x = value.interpolate(opts);
  x.toJSON = () => x.__getValue();
  return x;
};

interface IPropTypes extends ScrollViewProps {
  backgroundColor: string;
  fadeOutForeground: boolean;
  fadeOutBackground: boolean;
  contentBackgroundColor: string;
  onChangeHeaderVisibility: (a: number) => void;
  parallaxHeaderHeight: number;
  renderBackground: () => {};
  renderContentBackground: () => void;
  renderFixedHeader: () => void;
  renderForeground: () => {};
  renderStickyHeader: () => {};
  stickyHeaderHeight: number;
  contentContainerStyle: any;
  outputScaleValue: number;
  scrollViewRef: React.MutableRefObject<ScrollView>;
}

interface State {
  scrollY: any;
  viewHeight: number;
  viewWidth: number;
}

export default class ParallaxScrollView extends Component<IPropTypes, State> {
  static defaultProps = {
    backgroundColor: '#000',
    contentBackgroundColor: '#fff',
    fadeOutForeground: true,
    onChangeHeaderVisibility: () => {},
    renderBackground: renderEmpty,
    renderContentBackground: noRender,
    renderForeground: () => {},
    stickyHeaderHeight: 0,
    contentContainerStyle: null,
    outputScaleValue: 5,
  };
  scrollY: any;
  _footerComponent: Object;
  _footerHeight: number;
  containerHeight: number;
  SCROLLVIEW_REF: React.RefObject<ScrollView>;
  constructor(props: IPropTypes) {
    super(props);
    this.SCROLLVIEW_REF = React.createRef();
    if (props.renderStickyHeader && !props.stickyHeaderHeight) {
      console.warn(
        'Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used.'
      );
    }
    this.state = {
      scrollY: new Animated.Value(0),
      viewHeight: window.height,
      viewWidth: window.width,
    };

    this.scrollY = new Animated.Value(0);
    this._footerComponent = { setNativeProps() {} };
    this._footerHeight = 0;
    this.containerHeight = 0;
  }

  render() {
    const {
      backgroundColor,
      children,
      contentBackgroundColor,
      fadeOutForeground,
      fadeOutBackground,
      parallaxHeaderHeight,
      renderBackground,
      renderContentBackground,
      renderFixedHeader,
      renderForeground,
      renderStickyHeader,
      stickyHeaderHeight,
      contentContainerStyle,
      onChangeHeaderVisibility,
      outputScaleValue,
      ...scrollViewProps
    } = this.props;

    const background = this._renderBackground(
      fadeOutBackground,
      backgroundColor,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderBackground,
      outputScaleValue
    );
    const foreground = this._renderForeground(
      fadeOutForeground,
      parallaxHeaderHeight,
      stickyHeaderHeight,
      renderForeground
    );
    const bodyComponent = this._wrapChildren(
      children,
      contentBackgroundColor,
      contentContainerStyle
    );
    const footerSpacer = this._renderFooterSpacer(contentBackgroundColor);
    const maybeStickyHeader = this._maybeRenderStickyHeader(
      parallaxHeaderHeight,
      stickyHeaderHeight,
      backgroundColor,
      renderFixedHeader,
      renderStickyHeader
    );
    return (
      <View
        style={styles.container}
        onLayout={(e) => this._maybeUpdateViewDimensions(e)}
      >
        {background}
        {React.cloneElement(
          <Animated.ScrollView
            {...scrollViewProps}
            ref={this.props.scrollViewRef}
          />,
          {
            style: [styles.scrollView],
            scrollEventThrottle: 1,
            onScroll: Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              { useNativeDriver: true, listener: this._onScroll.bind(this) }
            ),
          },
          foreground,
          bodyComponent,
          footerSpacer
        )}
        {maybeStickyHeader}
      </View>
    );
  }

  _onScroll(e: { nativeEvent: { contentOffset: { y: number } } }) {
    const {
      parallaxHeaderHeight,
      stickyHeaderHeight,
      onChangeHeaderVisibility,
    } = this.props;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    if ((e.nativeEvent.contentOffset.y / p) * 100 > 100) {
    }
    onChangeHeaderVisibility((e.nativeEvent.contentOffset.y / p) * 100);
  }

  _maybeUpdateViewDimensions(e: {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
    };
  }) {
    const {
      nativeEvent: {
        layout: { width, height },
      },
    } = e;

    if (width !== this.state.viewWidth || height !== this.state.viewHeight) {
      this.setState({
        viewWidth: width,
        viewHeight: height,
      });
    }
  }

  _renderBackground(
    fadeOutBackground: boolean,
    backgroundColor: string,
    parallaxHeaderHeight: number,
    stickyHeaderHeight: number,
    renderBackground: () => {},
    outputScaleValue: number
  ) {
    const { viewWidth, viewHeight } = this.state;
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            backgroundColor,
            height: parallaxHeaderHeight,
            width: viewWidth,
            opacity: fadeOutBackground
              ? interpolate(scrollY, {
                  inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                  outputRange: [1, 0.3, 0.1, 0],
                  extrapolate: 'clamp',
                })
              : 1,
            transform: [
              {
                translateY: interpolate(scrollY, {
                  inputRange: [0, p],
                  outputRange: [0, -p],
                  extrapolateRight: 'extend',
                  extrapolateLeft: 'clamp',
                }),
              },
              {
                scale: interpolate(scrollY, {
                  inputRange: [-viewHeight, 0],
                  outputRange: [outputScaleValue, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View>{renderBackground()}</View>
      </Animated.View>
    );
  }

  _renderForeground(
    fadeOutForeground: boolean,
    parallaxHeaderHeight: number,
    stickyHeaderHeight: number,
    renderForeground: () => {}
  ) {
    const { scrollY } = this;
    const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
    return (
      <View style={styles.parallaxHeaderContainer}>
        <Animated.View
          style={[
            styles.parallaxHeader,
            {
              height: parallaxHeaderHeight,
              opacity: fadeOutForeground
                ? interpolate(scrollY, {
                    inputRange: [0, p * (1 / 2), p * (3 / 4), p],
                    outputRange: [1, 0.3, 0.1, 0],
                    extrapolate: 'clamp',
                  })
                : 1,
            },
          ]}
        >
          <View style={{ height: parallaxHeaderHeight }}>
            {renderForeground()}
          </View>
        </Animated.View>
      </View>
    );
  }

  _wrapChildren(
    children: ReactNode,
    contentBackgroundColor: string,
    contentContainerStyle: { backgroundColor: string }
  ) {
    const { viewHeight } = this.state;
    const containerStyles = [{ backgroundColor: contentBackgroundColor }];

    if (contentContainerStyle) containerStyles.push(contentContainerStyle);

    this.containerHeight = viewHeight;

    React.Children.forEach(children, (item) => {
      if (item && Object.keys(item).length !== 0) {
        this.containerHeight = 0;
      }
    });

    return (
      <View style={[containerStyles, { minHeight: this.containerHeight }]}>
        {this.props.renderContentBackground()}
        {children}
      </View>
    );
  }

  _renderFooterSpacer(contentBackgroundColor: string) {
    return (
      <View
        ref={(ref) => {
          if (ref) {
            this._footerComponent = ref;
          }
        }}
        style={{ backgroundColor: contentBackgroundColor }}
      />
    );
  }

  _maybeRenderStickyHeader(
    parallaxHeaderHeight: number,
    stickyHeaderHeight: number,
    backgroundColor: string,
    renderFixedHeader: () => void,
    renderStickyHeader: () => {}
  ) {
    const { viewWidth } = this.state;
    const { scrollY } = this;
    if (renderStickyHeader || renderFixedHeader) {
      const p = pivotPoint(parallaxHeaderHeight, stickyHeaderHeight);
      return (
        <View
          style={[
            styles.stickyHeader,
            {
              width: viewWidth,
              ...(stickyHeaderHeight ? { height: stickyHeaderHeight } : null),
            },
          ]}
        >
          {renderStickyHeader ? (
            <Animated.View
              style={{
                backgroundColor,
                height: stickyHeaderHeight,
                opacity: interpolate(scrollY, {
                  inputRange: [0, p],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Animated.View>{renderStickyHeader()}</Animated.View>
            </Animated.View>
          ) : null}
          {renderFixedHeader && renderFixedHeader()}
        </View>
      );
    } else {
      return null;
    }
  }
}
