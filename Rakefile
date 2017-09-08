require 'html-proofer'

task :test do
  options = {
    :checks_to_ignore => ["ImageCheck"],
    :internal_domains => ["mademistakes.com"],
    :url_ignore => [/sktchy.com/],
    # :disable_external => true,
    :allow_hash_href => true,
    :assume_extension => true,
    :empty_alt_ignore => true
  }
  HTMLProofer.check_directory("./dist", options).run
end
