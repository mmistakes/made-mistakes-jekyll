module Jekyll
  class LazyLoadTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      @markup = markup
      super
    end

    def render(context)
      # Settings
      site = context.registers[:site]
      url = site.config["url"]
      baseurl = site.config["baseurl"] || ""

      # Render any Liquid variables in tag arguments and un-escape template code
      render_markup = Liquid::Template.parse(@markup).render(context).gsub(/\\\{\\\{|\\\{\\%/, '\{\{' => '{{', '\{\%' => '{%')

      # Extract tag segments
      markup = /(?<html_attr>[\s\S]+)?$/.match(render_markup)

      unless markup
        Jekyll.logger.abort_with("[Jekyll]", "Can't read this tag: #{@markup}")
      end

      # Process attributes
      html_attr = if markup[:html_attr]
        Hash[ *markup[:html_attr].scan(/(?<attr>[^\s="]+)(?:="(?<value>[^"]+)")?\s?/).flatten ]
      else
        {}
      end

      # Make relative paths into absolute
      unless html_attr["src"] == nil || html_attr["data-src"] == nil
        unless html_attr["src"] =~ (/https?:\/\//)
          html_attr["src"] = File.join(url, baseurl, html_attr["src"])
        end

        unless html_attr["data-src"] =~ (/https?:\/\//)
          html_attr["data-src"] = File.join(url, baseurl, html_attr["data-src"])
        end
      end

      image_source = html_attr["data-src"]

      # Create a low-quality image placeholder string
      if html_attr["src"] == nil
        lqip = "src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\""
      end

      # Create a string of all transformed attributes
      html_attr_string = html_attr.inject('') { |string, attrs|
        if attrs[1]
          string << "#{attrs[0]}=\"#{attrs[1]}\" "
        else
          string << "#{attrs[0]} "
        end
      }

      # Output image tag with everything together
      "\n<noscript><img src=\"#{image_source}\" alt=\"\"></noscript>\n<img #{lqip} #{html_attr_string} class=\"lazyload fade-in\">"
    end
  end
end

Liquid::Template.register_tag('lazyload', Jekyll::LazyLoadTag)
