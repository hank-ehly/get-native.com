namespace :deploy do
    desc 'Run `npm run build.prod.exp` from the project root directory'
    task :build_production do
        on roles(:web) do |_|
            within "#{release_path}" do
                puts "Running 'npm run build.prod.exp' from #{release_path}"
                execute :npm, 'run', 'build.prod.exp'
            end
        end
    end
    
    desc 'Run `npm run build.stg.exp` from the project root directory'
		task :build_staging do
				on roles(:web) do |_|
						within "#{release_path}" do
								puts "Running 'npm run build.stg.exp' from #{release_path}"
								execute :npm, 'run', 'build.stg.exp'
						end
				end
		end
end
