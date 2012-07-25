require "jekyll-less/version"
require 'less'

module Jekyll
  module Less

    class LessCssFile < Jekyll::StaticFile

      # Obtain destination path.
      #   +dest+ is the String path to the destination dir
      #
      # Returns destination file path.
      def destination(dest)
        File.join(dest, @dir, @name.sub(/less$/, 'css'))
      end

      # Convert the less file into a css file.
      #   +dest+ is the String path to the destination dir
      #
      # Returns false if the file was not modified since last time (no-op).
      def write(dest)
        dest_path = destination(dest)
        
        return false if File.exist? dest_path and !modified?
        @@mtimes[path] = mtime

        FileUtils.mkdir_p(File.dirname(dest_path))
        begin
          content = File.read(path)
          content = ::Less::Parser.new({:paths => [File.dirname(path)]}).parse(content).to_css
          File.open(dest_path, 'w') do |f|
            f.write(content)
          end
        rescue => e
          STDERR.puts "Less Exception: #{e.message}"
        end

        true
      end

    end

    class LessCssGenerator < Jekyll::Generator
      safe true

      # Jekyll will have already added the *.less files as Jekyll::StaticFile
      # objects to the static_files array.  Here we replace those with a
      # LessCssFile object.
      def generate(site)
        site.static_files.clone.each do |sf|
          if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /\.less$/
            site.static_files.delete(sf)
            name = File.basename(sf.path)
            destination = File.dirname(sf.path).sub(site.source, '')
            site.static_files << LessCssFile.new(site, site.source, destination, name)
          end
        end
      end
    end

  end
end