class YouTube < Liquid::Tag
  def initialize(tagName, markup, tokens)
    super

    args = markup.split(' ')
    @id = args[0]
    @width = 640
    @height = 360

    if args[1]
      @width = args[1]
      @height = args[2]
    end
  end

  def render(context)
    "<div class=\"responsive-video-container\"><iframe width=\"#{@width}\" height=\"#{@height}\" data-src=\"https://www.youtube-nocookie.com/embed/#{@id}?showinfo=0\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen class=\"lazyload\"></iframe></div>"
  end

  Liquid::Template.register_tag("youtube", self)
end

class Vimeo < Liquid::Tag
  def initialize(tagName, markup, tokens)
    super

    args = markup.split(' ')
    @id = args[0]
    @width = 640
    @height = 360

    if args[1]
      @width = args[1]
      @height = args[2]
    end
  end

  def render(context)
    "<div class=\"responsive-video-container\"><iframe width=\"#{@width}\" height=\"#{@height}\" src=\"https://player.vimeo.com/video/#{@id}?title=0&amp;byline=0\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen class=\"lazyload\"></iframe></div>"
  end

  Liquid::Template.register_tag("vimeo", self)
end
