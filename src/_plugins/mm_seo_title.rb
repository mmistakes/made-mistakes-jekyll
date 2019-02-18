module Jekyll
  class SeoTag
    class Drop < Jekyll::Drops::Drop
      def title
        @title ||= begin
          if site_title && page_title != site_title
            page_title + TITLE_SEPARATOR + site_title
          elsif site_description && site_title
            site_title + TITLE_SEPARATOR + site_description
          else
            page_title || site_title
          end
        end

        return page_title + " - " + page_number + TITLE_SEPARATOR + site_title if page_number

        @title
      end

      def page_number
        return unless @context["paginator"] && @context["paginator"]["page"]

        current = @context["paginator"]["page"]
        total = @context["paginator"]["total_pages"]

        return "page #{current} of #{total}" if current > 1
      end
    end
  end
end
