# Jekyll Post Navigation within a Category
# http://ajclarkson.co.uk/blog/jekyll-category-post-navigation/

module Jekyll
  class WithinCategoryPostNavigation < Generator
    def generate(site)
      site.categories.each_pair do |category, posts|
        posts.sort! { |a,b| b <=> a}
        posts.each do |post|
          index = posts.index post
          previous_in_category = nil
          next_in_category = nil
          if index
            if index < posts.length - 1
              previous_in_category = posts[index + 1]
            end
            if index > 0
              next_in_category = posts[index - 1]
            end
          end
          post.data["previous_in_category"] = previous_in_category unless previous_in_category.nil?
          post.data["next_in_category"] = next_in_category unless next_in_category.nil?
        end
      end
    end
  end
end
