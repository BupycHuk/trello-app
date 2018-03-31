require_relative '../rails_helper.rb'
require 'factory_bot'

RSpec.describe 'columns', :type => :request do
  it 'returns the columns' do
    board = FactoryBot.create(:board)
    FactoryBot.create_list(:column, 5, board: board)

    get "/api/boards/#{board.link}/columns"

    expect(response).to be_success

    columns = JSON.parse(response.body)

    expect(columns.length).to eq 5

  end

  it 'add new column' do

    board = FactoryBot.create(:board)

    headers = { "CONTENT_TYPE" => "application/json" }
    post "/api/boards/#{board.link}/columns", :params => '{"title": "test"}', :headers => headers

    expect(response).to be_success

    column = JSON.parse(response.body)

    expect(column['title']).not_to be_nil
    expect(column['title']).not_to eq ''
    expect(column['title']).to eq 'test'
    expect(column['id']).not_to be_nil
    expect(column['id']).not_to eq ''
  end
end