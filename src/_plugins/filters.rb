module Jekyll
  module Filters
    # Sort a hash using String#casecmp the case-insensitive version of String#<=>
    # By default, Enumerable#sort uses <=>
    # See Add sort_natural to jekyll/filters.rb https://github.com/jekyll/jekyll/issues/6290
    def sort_natural(input)
      input.sort { |apple, orange| apple.first.casecmp(orange.first) }

      # Other solution:
      #input.sort_by { |hash| hash.first.downcase }
    end

    def sort_tags_by_size(tags)
      tags.sort_by { |tag| tag.last.length }.reverse

      # Other solution:
      #tags.sort { |tag1, tag2| tag2.last.length <=> tag1.last.length }
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters)
