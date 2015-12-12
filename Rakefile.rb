##############
# Jekyll tasks
##############

# Usage: rake serve
desc "Serve Jekyll site locally"
task :serve do
  system "JEKYLL_ENV=development bundle exec jekyll serve --no-watch --config _config.yml,_config.dev.yml"
end # task :serve

# Usage: rake build
desc "Regenerate files for production"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end # task :build

# Usage: rake build-dev
desc "Regenerate files for development"
task :"build-dev" do
  system "JEKYLL_ENV=development bundle exec jekyll build --config _config.yml,_config.dev.yml --profile"
end # task :"build-dev"

# Usage: rake drafts
desc "Regenerate files and drafts for development"
task :drafts do
  system "JEKYLL_ENV=development bundle exec jekyll build --config _config.yml,_config.dev.yml --profile --drafts"
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
desc 'Notify Google of updated sitemap'
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
desc 'Notify Bing of updated sitemap'
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
  system 'rsync --perms --recursive --verbose --compress --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r _site/ new-mademistakes.com@s210904.gridserver.com:domains/mademistakes.com/html/'
end # task :rsync

# Usage: rake deploy
desc 'Regenerate, minify, and rsync files for production then notify services about new content'
task :deploy => [:build, :minify, :rsync, :notify] do
end # task :deploy
