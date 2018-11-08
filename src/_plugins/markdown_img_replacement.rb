# Description: Jekyll plugin to replace Markdown image syntax with lazyload HTML markup

Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  docExt = post.extname.tr('.', '')
  # only process if we deal with a markdown file
  if payload['site']['markdown_ext'].include? docExt
    newContent = post.content.gsub(/(?:!\[(.*?)\]\((.*?)\))/, '<noscript><img src="\2"></noscript><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="\2" alt="\1" class="lazyload fade-in">')
    post.content = newContent
  end
end
