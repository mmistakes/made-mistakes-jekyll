##############
# Jekyll tasks
##############

# Usage: rake serve
desc "Serve Jekyll site locally"
task :serve do
  system "bundle exec jekyll serve --no-watch --config _config.dev.yml"
end # task :serve

# Usage: rake build
desc "Build production Jekyll site"
task :build do
  system "bundle exec jekyll build"
end # task :build

# Usage: rake drafts
desc "Build local Jekyll site with _drafts posts"
task :drafts do
  system "bundle exec jekyll build --drafts --config _config.dev.yml"
end # task :drafts

##################
# Production tasks
##################

# Usage: rake minify
desc "Minify files"
task :minify do
  puts '* Minifying files'
  system "java -jar _build/htmlcompressor.jar -r --type html --compress-js -o _site _site"
end # task :minify

# Ping Pingomatic
desc 'Ping pingomatic'
task :pingomatic do
  begin
    require 'xmlrpc/client'
    puts '* Pinging ping-o-matic'
    XMLRPC::Client.new('rpc.pingomatic.com', '/').call('weblogUpdates.extendedPing', 'mademistakes.com' , 'https://mademistakes.com', 'https://mademistakes.com/atom.xml')
  rescue LoadError
    puts '! Could not ping ping-o-matic, because XMLRPC::Client could not be found.'
  end
end # task :pingomatic

# Ping Google
desc 'Notify Google of the new sitemap'
task :sitemapgoogle do
  begin
    require 'net/http'
    require 'uri'
    puts '* Pinging Google about our sitemap'
    Net::HTTP.get('www.google.com', '/webmasters/tools/ping?sitemap=' + URI.escape('https://mademistakes.com/sitemap.xml'))
  rescue LoadError
    puts '! Could not ping Google about our sitemap, because Net::HTTP or URI could not be found.'
  end
end # task :sitemapgoogle

# Ping Bing
desc 'Notify Bing of the new sitemap'
task :sitemapbing do
  begin
    require 'net/http'
    require 'uri'
    puts '* Pinging Bing about our sitemap'
    Net::HTTP.get('www.bing.com', '/webmaster/ping.aspx?siteMap=' + URI.escape('https://mademistakes.com/sitemap.xml'))
  rescue LoadError
    puts '! Could not ping Bing about our sitemap, because Net::HTTP or URI could not be found.'
  end
end # task :sitemapbing

# Usage: rake notify
desc 'Notify various services about new content'
task :notify => [:pingomatic, :sitemapgoogle, :sitemapbing] do
end # task :notify

# Usage: rake rsync
desc 'rsync the contents of ./_site to the server'
task :rsync do
  puts '* rsyncing the contents of ./_site to the server'
  system 'rsync -prvz --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r _site/ ekoagency.com@s98164.gridserver.com:domains/mademistakes.com/html/'
end # task :rsync

# Usage: rake deploy
desc 'Build _site, minify files, rsync the files, and notify services about new content'
task :deploy => [:build, :minify, :rsync, :notify] do
end # task :deploy
