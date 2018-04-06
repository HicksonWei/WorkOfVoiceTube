
new Vue({
  el: '#main',
  data: {
    oriCards: [],
    cards: [],
    captionIndex: {
      'cht': '中文',
      'ja': '日文',
      'vi': '越南文',
      'en': '英文',
    },
    levelIndex: {
      '1': '初級',
      '2': '中級',
      '3': '中高級',
      '4': '高級',
    },
    sorting: 'opt1',
    timespan: 'span1',
    screenSize: '',
  },
  mounted() {
    axios.get('https://merik.voicetube.com/demo/data')
      .then(response => {
        this.oriCards = response.data.data;
        this.cards = this.oriCards.sort((a, b) => b.publish - a.publish);
      })
      .catch(error => console.log(error));
    this.$nextTick(function () {
      this.screenSize = window.innerWidth;
    });
    const that = this;
    window.onresize = function () {
      that.screenSize = window.innerWidth;
    };
  },
  methods: {
    imgStyle(img) {
      return {
        backgroundImage: `url(${img})`,
      };
    },
    timeFormat(time) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      let converted = '';

      if (hours > 0) {
        converted += `${hours}:${(minutes < 10 ? '0' : '')}`;
      }
      converted += `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
      return converted;
    },
    sortPublish() {
      this.cards = this.cards.sort((a, b) => b.publish - a.publish);
    },
    sortViews() {
      this.cards = this.cards.sort((a, b) => b.views - a.views);
    },
    sortCollectCount() {
      this.cards = this.cards.sort((a, b) => b.collectCount - a.collectCount);
    },
    allSpan() {
      this.cards = this.oriCards;
      if (this.sorting === 'opt1') {
        this.cards.sort((a, b) => b.publish - a.publish);
      } else if (this.sorting === 'opt2') {
        this.cards.sort((a, b) => b.views - a.views);
      } else {
        this.cards.sort((a, b) => b.collectCount - a.collectCount);
      }
    },
    shortSpan() {
      this.cards = this.oriCards;
      this.cards = this.cards.filter((item) => item.duration < 300);
      if (this.sorting === 'opt1') {
        this.cards.sort((a, b) => b.publish - a.publish);
      } else if (this.sorting === 'opt2') {
        this.cards.sort((a, b) => b.views - a.views);
      } else {
        this.cards.sort((a, b) => b.collectCount - a.collectCount);
      }
    },
    mediumSpan() {
      this.cards = this.oriCards;
      this.cards = this.cards.filter((item) => item.duration >= 300 && item.duration < 600);
      if (this.sorting === 'opt1') {
        this.cards.sort((a, b) => b.publish - a.publish);
      } else if (this.sorting === 'opt2') {
        this.cards.sort((a, b) => b.views - a.views);
      } else {
        this.cards.sort((a, b) => b.collectCount - a.collectCount);
      }
    },
    longSpan() {
      this.cards = this.oriCards;
      this.cards = this.cards.filter((item) => item.duration >= 600);
      if (this.sorting === 'opt1') {
        this.cards.sort((a, b) => b.publish - a.publish);
      } else if (this.sorting === 'opt2') {
        this.cards.sort((a, b) => b.views - a.views);
      } else {
        this.cards.sort((a, b) => b.collectCount - a.collectCount);
      }
    },
  },
});