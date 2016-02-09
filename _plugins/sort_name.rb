# Jekyll Sort by Name and Post Count Filter
# http://www.codeofclimber.ru/2015/sorting-site-tags-in-jekyll/

# Sort by name example:
# <ul>
# {% assign sorted_tags_by_name = site.tags | sort_tags_by_name %}
# {% for tag in sorted_tags_by_name %}
#   <li>
#     <a href="/tag/{{ tag[0] }}">
#       {{ tag[0] }}
#       <span>{{ tag[1] }}</span>
#     </a>
#   </li>
# {% endfor %}
# </ul>

# Sort by post count example:
# <ul>
# {% assign sorted_tags_by_posts_count = site.tags | sort_tags_by_posts_count %}
# {% for tag in sorted_tags_by_posts_count %}
#   <li>
#     <a href="/tag/{{ tag[0] }}">
#       {{ tag[0] }}
#       <span>{{ tag[1] }}</span>
#     </a>
#   </li>
# {% endfor %}
# </ul>

module Jekyll
  module TagHelpersFilter
    def sort_tags_by_name(tags)
      return tags.map   { |k,v| [ k, v.size] }
                 .sort_by { |x| [ x[0].downcase ] }
    end

    def sort_tags_by_posts_count(tags)
      max_posts_count_among_all_tags = tags.max_by { |k,v| v.size }[1].size
      return tags.map   { |k,v| [ k, v.size ] }
                 .sort_by { |x| [ max_posts_count_among_all_tags - x[1], x[0].downcase ] }
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagHelpersFilter)
