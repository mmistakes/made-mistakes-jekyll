# Usage: rake minify
desc "Minify files"
task :minify do
  system "java -jar _build/htmlcompressor.jar -r --type html --compress-js -o _site _site"
end # task :minify

# Usage: rake drafts
desc "Build Jekyll site with _drafts posts"
task :drafts do
  system "jekyll build --drafts --limit_posts 10"
end # task :drafts