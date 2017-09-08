require 'html-proofer'

task :test do
  options = {
    :checks_to_ignore => ['ImageCheck'],
    :internal_domains => ['mademistakes.com'],
    :cache => {
      :timeframe => '30d'
    },
    :url_ignore => [/(twitter|instagram|sktchy|mix.fiftythree|paper.fiftythree).com/],
    # disable SSL certificates
    :typhoeus => {
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0
    },
    :allow_hash_href => true,
    :assume_extension => true,
    :empty_alt_ignore => true
  }
  HTMLProofer.check_directory('./dist', options).run
end
