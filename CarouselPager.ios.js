var React = require('react');
var {
  ScrollView,
} = require('react-native');

var CarouselPager = React.createClass({

  scrollToPage(page, animated) {
    if (typeof animated === 'undefined') {
      animated = true;
    }

    if (this.props.isHorizontal) {
      this.refs.scrollView.scrollTo({x: page * this.props.width, y: 0, animated: animated});
    } else {
      this.refs.scrollView.scrollTo({y: page * this.props.height, x: 0, animated: animated});
    }
  },

  _onMomentumScrollEnd(e) {
    if (this.props.isHorizontal) {
      var activePage = e.nativeEvent.contentOffset.x / this.props.width;
    } else {
      var activePage = e.nativeEvent.contentOffset.y / this.props.height;
    }

    this.props.onEnd(activePage);
  },

  render() {
    return <ScrollView
      ref={(scrollView) => this.refs = { scrollView }}
      contentContainerStyle={this.props.contentContainerStyle}
      automaticallyAdjustContentInsets={false}
      horizontal={this.props.isHorizontal}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      onScrollBeginDrag={this.props.onBegin}
      onMomentumScrollEnd={this._onMomentumScrollEnd}
      scrollsToTop={false}
      style={{ height: this.props.height, width: this.props.width }}
    >
      {this.props.children}
    </ScrollView>;
  },
});

module.exports = CarouselPager;
