require_relative '../rails_helper.rb'
require 'factory_bot'

RSpec.describe 'boards', :type => :request do
  it 'returns the board' do
    board = FactoryBot.create(:board)

    get "/api/boards/#{board.link}.json"

    expect(response).to be_success

    expect(response.body).to have_json_path("id")
    expect(response.body).to have_json_path("title")
    expect(response.body).to have_json_path("link")

    board_json = JSON.parse(response.body)

    expect(board_json['link']).to eq board.link
    expect(board_json['title']).to eq board.title

  end

  it 'add new board' do

    headers = { "CONTENT_TYPE" => "application/json" }
    post '/api/boards', :params => '{"title": "test"}', :headers => headers

    expect(response).to be_success

    board = JSON.parse(response.body)

    expect(board['title']).to eq 'test'
    expect(board['title']).not_to be_nil
    expect(board['title']).not_to eq ''
    expect(board['link']).not_to be_nil
    expect(board['link']).not_to eq ''
    expect(board['id']).not_to be_nil
    expect(board['id']).not_to eq ''
  end
end