<template>
  <div id="disqus_thread"></div>
</template>

<script>
export default {
  created() {
    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = this.$route.params.chapterId;
    };

    (function () {
      var d = document,
        s = d.createElement('script');
      s.src = 'https://dzmanga.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  },
};
</script>

<style></style>
