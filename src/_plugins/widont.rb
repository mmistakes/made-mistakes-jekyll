require "liquid"

module WidontFilter
  # Public: Apply some regex to the given string of text.
  #
  # text - The String to be widont'ed.
  #
  # Returns the text, free of widows.
  #
  # use: {{ page.title | widont }}
  def widont(text)
    text.strip.gsub(/([^<>\s]+?[^\s"])\s+((?:<[^>]+>|\S)+)$/, "\1&nbsp;\2")
    return text
  end
end

Liquid::Template.register_filter(WidontFilter)
