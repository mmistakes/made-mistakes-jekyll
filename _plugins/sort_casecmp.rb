module Jekyll
  module Filters
    # Sort a hash using String#casecmp the case-insensitive version of String#<=>
    # By default, Enumerable#sort uses <=>
    def sort_casecmp(input)
      input.sort { |apple, orange| apple.first.casecmp(orange.first) }

      # Other solution:
      #input.sort_by { |hash| hash.first.downcase }
    end
  end
end