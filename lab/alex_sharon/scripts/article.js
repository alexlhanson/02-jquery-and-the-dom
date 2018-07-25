'use strict';

$(document).ready(function () {
  let blogArticles = [];
  console.log(blogArticles);

  // COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
  // It is a constructor function that creates an instance of rawData

  function Article(rawDataObj) {
    // TODO: Use the JS object that is passed in to complete this constructor function:
    // Save ALL the properties of `rawDataObj` into `this`
    this.blogPost = rawDataObj;
    // var title = this.title;
    // var category = this.category;
    // var author = this.authur;
    // var authorUrl = this.authorUrl;
    // var publishedOn = this.publishedOn;
    // var body = this.body;
  }

  Article.prototype.toHtml = function () {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // It will also include meta data like attributes and classes

    let $newArticle = $('article.template').clone().removeClass('template');
    /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-category', this.category);

    /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
      We need to fill in:
        1. author name,
        2. author url,
        3. article title,
        4. article body, and
        5. publication date. */
    $newArticle.find('h1').text(this.blogPost.title);
    $newArticle.find('a').text(this.blogPost.author);
    $newArticle.find('a').attr(this.blogPost.authorUrl);
    $newArticle.find('.article-body').html(this.blogPost.body);
    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html(`about ${parseInt((new Date() - new Date(this.blogPost.publishedOn)) / 60 / 60 / 24 / 1000)} days ago`);
    $newArticle.append('<hr>');
    return $newArticle;
  };
  
  rawData.sort(function (a, b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  // TODO: Refactor these for loops using the .forEach() array method DONE.


  rawData.forEach(function(article){
    blogArticles.push(new Article(article));
  });

  blogArticles.forEach(function(article){
    $('#articles').append(article.toHtml());
  });
});