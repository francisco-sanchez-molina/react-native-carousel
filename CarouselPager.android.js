var React = require('react');
var {
  ScrollView,
} = require('react-native');

const slideOffset = 0.10;

var CarouselPager = React.createClass({
  currentPage: 0,

  componentDidMount() {
    setTimeout(() => {
      // this.refs.scrollView.scrollTo(300);
    }, 1500);
  },

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

  adjustPageOffset(activePage) {
    let nextPage = this.currentPage;
    let toAnimate = true;

    if (this.currentPage < activePage &&
      (this.currentPage + slideOffset) < activePage) {
      nextPage = this.currentPage + 1;
      toAnimate = (nextPage + 1) > activePage;

    } else if (this.currentPage > activePage &&
      (this.currentPage - slideOffset) > activePage) {
        nextPage = this.currentPage - 1;
        toAnimate = (nextPage - 1) < activePage;
    }

    return {
      nextPage,
      toAnimate,
    };
  },

  _onMomentumScrollEnd(e) {
    if (this.props.isHorizontal) {
      var activePage = e.nativeEvent.contentOffset.x / this.props.width;
    } else {
      var activePage = e.nativeEvent.contentOffset.y / this.props.height;
    }
    const adjusted = this.adjustPageOffset(activePage);
    this.currentPage = adjusted.nextPage;
    this.props.onEnd(this.currentPage);
    this.scrollToPage(this.currentPage, adjusted.toAnimate);
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
      bounces={true}
      onTouchStart={this.props.onBegin}
      scrollsToTop={false}
      style={{ height: this.props.height, width: this.props.width, backgroundColor: 'transparent' }}
      onScrollEndDrag={this._onMomentumScrollEnd}
    >
      {this.props.children}
    </ScrollView>;
  },
});

module.exports = CarouselPager;
