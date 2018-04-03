class BoardChannel < ApplicationCable::Channel

  def subscribed
    board = Board.find_by_link(params[:link])
    stream_for board
  end
end