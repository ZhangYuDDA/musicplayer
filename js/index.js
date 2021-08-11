/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
    el: '#app',
    data: {
        //搜索内容
        searchContent: '',
        //歌曲列表
        musicArr: [],
        //歌曲地址
        musicSrc: '',
        //歌曲封面地址
        picUrl: '',
        //热评
        hotComments: [],
        //是否在播放音乐
        isPlaying: false,
        //是否在播放mv
        isPlayMV: false,
        //mv地址
        mvUrl: ''
    },
    methods: {
        searchMusic: function () {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.searchContent).then(function (response) {
                // console.log(response);
                that.musicArr = response.data.result.songs;
            }, function (err) { })
        },
        playMusic: function (musicId) {
            var that = this;
            // console.log(musicId);
            //获取歌曲url
            axios.get('https://autumnfish.cn/song/url?id=' + musicId).then(function (response) {
                // console.log(response);
                that.musicSrc = response.data.data[0].url;
            }, function (err) { })
            //获取歌曲的封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(function (response) {
                // console.log(response);
                that.picUrl = response.data.songs[0].al.picUrl;
            }, function (err) { })
            //获取歌曲热门评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(function (response) {
                // console.log(response);
                that.hotComments = response.data.hotComments;
            }, function (err) { })
        },
        //播放音乐时添加动画
        nowPlay: function () {
            this.isPlaying = true;
        },
        nowPause: function () {
            this.isPlaying = false;
        },
        //播放mv
        playMV: function (mvid) {
            document.querySelector('.myAudio').pause();
            var that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(function (response) {
                // console.log(response);
                that.mvUrl = response.data.data.url;
                that.isPlayMV = true;
            }, function (err) { })
        },
        stopMV: function () {
            this.isPlayMV = false;
            this.mvUrl = '';
        }
    }
})