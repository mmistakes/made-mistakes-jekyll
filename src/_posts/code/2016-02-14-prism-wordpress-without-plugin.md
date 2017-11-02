---
title: "Prism code highlighter in WordPress without a plugin"
excerpt: "Prism code highlighter in WordPress without a plugin"
image:
  path: &image "/assets/images/prism-wordpress-without-plugin-feature.png"
  feature: *image
  thumbnail: "/assets/images/prism-wordpress-without-plugin-feature-th.png"
  teaser: *image
tags:
  - WordPress
  - PHP
comments: true
comments_locked: false
published: true
last_modified_at: 2016-02-14T18:57:43
redirect_from: "/prism-wordpress-without-plugin/"
---
I was looking for a lightweight code syntax highlighter for WordPress that only loaded when needed on the page. I found [Prism](http://prismjs.com) which fitted my needs. There are a few WordPress plugins for Prism, but I felt that it was not needed and too bloated. Here is what I did

1. Download a minified version of Prism from [here](http://prismjs.com/download.html). You can always re-download this later if you change your mind on which themes, languages and plugins you want. Only choose what you really need to keep the files small.
{% include figure
  image_path="/assets/images/prism-wordpress-without-plugin-customise-Prism.png"
  caption="Customise Prism and choose only what you need"
%}

{:start="2"}
2. Store the downloaded Prism css and javascript in your theme folder (e.g. `wp-content/themes/your_theme_here`). I highly recommend that you use a [child theme](https://codex.wordpress.org/Child_Themes) so updates to the main theme does not overwrite your changes. In this example I store the files as `/css/prism.css` and `/js/prism.js` in my theme folder
3. Edit you `wp-content/themes/your_theme_here/functions.php` file and add the code below. Remember to change the paths to the css and javascript file to where you stored it. The function makes sure that the Prism css and javascript is registered in WordPress and that it is only used if the `<code class="language-` text is detected on a page, post, archive page, category page or the frontpage with a list of recent posts. If you do not use Prism it will not be downloaded by the client!
{% highlight php linenos %}
function add_prism() {
        wp_register_style('prismCSS', get_stylesheet_directory_uri() . '/css/prism.css');
        wp_register_script('prismJS', get_stylesheet_directory_uri() . '/js/prism.js');

        global $post, $wp_query;
        $post_contents = '';
        if ( is_singular() ) {
                $post_contents = $post->post_content;
        } elseif ( is_archive() || (is_front_page() && is_home())) {
                $post_ids = wp_list_pluck( $wp_query->posts, 'ID' );
                foreach ( $post_ids as $post_id ) {
                        $post_contents .= get_post_field( 'post_content', $post_id );
                }
        }
        if ( strpos( $post_contents, '<code class="language-' ) !== false ) {
                wp_enqueue_style('prismCSS');
                wp_enqueue_script('prismJS');
        }
}
add_action('wp_enqueue_scripts', 'add_prism');
{% endhighlight %}

{:start="4"}
4. Start using the Prism syntax highlighter! Take a look at the main [Prism](http://prismjs.com) page or even inspect the source of this page. Remember to flush your WordPress cache if using a caching plugin.

To add or remove themes, languages or plugins from Prism open the `prism.css` file and copy the url from the comment. This url will load the Prism webpage with all your settings checked. Mine was

[http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+aspnet+bash+csharp+ruby+json+lua+php&plugins=line-numbers+autolinker+show-language+command-line](http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+aspnet+bash+csharp+ruby+json+lua+php&plugins=line-numbers+autolinker+show-language+command-line)

Now change whatever you like and redo step 1 and 2
