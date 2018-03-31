require_relative '../rails_helper.rb'
require 'factory_bot'

RSpec.describe 'tasks', :type => :request do

  it 'add new task' do

    board = FactoryBot.create(:board)
    column = FactoryBot.create(:column, board: board)

    headers = { "CONTENT_TYPE" => "application/json" }
    post "/api/boards/#{board.link}/tasks", :params => "{\"title\": \"new task\", \"column_id\": #{column.id}}", :headers => headers

    puts response.body
    expect(response).to be_success

    task = JSON.parse(response.body)

    expect(task['title']).not_to be_nil
    expect(task['title']).not_to eq ''
    expect(task['title']).to eq 'new task'
    expect(task['column_id']).to eq column.id
  end

  it 'update task' do

    board = FactoryBot.create(:board)
    column = FactoryBot.create(:column, board: board)
    task = FactoryBot.create(:task, column: column)

    task.title = "new title"

    updated_task = Task.find(task.id)

    expect(updated_task.title).to_not eq "new title"

    headers = { "CONTENT_TYPE" => "application/json" }
    put "/api/boards/#{board.link}/tasks/#{task.id}", :params => task.to_json, :headers => headers

    puts response.body
    expect(response).to be_success

    response_task = JSON.parse(response.body)

    expect(response_task['title']).not_to be_nil
    expect(response_task['title']).not_to eq ''
    expect(response_task['title']).to eq 'new title'
    expect(response_task['column_id']).to eq column.id

    updated_task = Task.find(task.id)

    expect(updated_task.title).to eq "new title"

  end
end