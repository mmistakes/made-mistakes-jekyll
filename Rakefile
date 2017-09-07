require 'html-proofer'

task :test do
  sh "gulp build --prod"
  options = {
    # ignore SSL certificates
    :typhoeus => {
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0
    },
    :checks_to_ignore => ["ScriptCheck", "ImageCheck"],
    :disable_external => true,
    :allow_hash_href => true,
    :assume_extension => true,
    :empty_alt_ignore => true
  }
  HTMLProofer.check_directory("./dist", options).run
end
