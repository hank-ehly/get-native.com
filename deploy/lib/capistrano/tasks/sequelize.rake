namespace :sequelize do
    desc 'Runs sequelize db:migrate'
    task 'migrate' do
        on roles(:web) do
            within release_path do
                execute :npm, 'sequelize', 'db:migrate'
            end
        end
    end

    desc 'Runs sequelize db:migrate:undo:all'
    task 'migrate:undo:all' do
        on roles(:web) do
            within release_path do
                execute :npm, 'sequelize', 'db:migrate:undo:all'
            end
        end
    end


    desc 'Runs sequelize db:seed:all'
    task 'seed:all' do
        on roles(:web) do
            within release_path do
                execute :npm, 'sequelize', 'db:seed:all'
            end
        end
    end

    desc 'Runs sequelize db:seed:undo:all'
    task 'seed:undo:all' do
        on roles(:web) do
            within release_path do
                execute :npm, 'sequelize', 'db:seed:undo:all'
            end
        end
    end
end
