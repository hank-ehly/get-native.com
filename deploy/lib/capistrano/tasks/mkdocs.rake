namespace :mkdocs do
    desc 'Runs mkdocs build'
    task :build do
        on roles(:web) do
            within release_path do
                execute :mkdocs, 'build'
            end
        end
    end
end
