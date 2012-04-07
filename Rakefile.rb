# Usage: rake minify
desc "Minify files"
task :minify do
  system "java -jar _build/htmlcompressor.jar -r --type html -o _site _site"
end # task :minify