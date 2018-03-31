module Api
  class BoardsController < ApiController
    before_action :set_board, only: [:show, :update, :destroy]

    # GET /boards/1
    # GET /boards/1.json
    def show
    end

    # POST /boards
    # POST /boards.json
    def create
      @board = Board.new(board_params)

      if @board.save
        render :show, status: :created
      else
        render json: @board.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /boards/1
    # PATCH/PUT /boards/1.json
    def update
      if @board.update(board_params)
        render :show, status: :ok
      else
        render json: @board.errors, status: :unprocessable_entity
      end
    end

    # DELETE /boards/1
    # DELETE /boards/1.json
    def destroy
      @board.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_board
        @board = Board.find_by_link(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def board_params
        params.fetch(:board, {}).permit(:title)
      end
  end

end