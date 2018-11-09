# Source: https://stackoverflow.com/questions/19169849/how-to-get-markdown-processed-content-in-jekyll-tag-plugin

module Jekyll
  module Tags
    class NoticeTag < Liquid::Block

      def initialize(tag_name, type, tokens)
        super
        type.strip!
        if %w(info danger warning success).include?(type)
          @type = type
        else
          @type = ""
        end
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        output = converter.convert(super(context))
        "<div class=\"notice #{@type} no_toc_section\">#{output}</div>"
      end
    end
  end
end

Liquid::Template.register_tag('notice', Jekyll::Tags::NoticeTag)
