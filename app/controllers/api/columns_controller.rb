module Api
  class ColumnsController < ApiController
    before_action :set_board
    before_action :set_column, only: [:show, :update, :destroy]

    # GET /columns
    # GET /columns.json
    def index
      @columns = Column.includes(:tasks).where(board: @board)
    end

    # GET /columns/1
    # GET /columns/1.json
    def show
    end

    # POST /columns
    # POST /columns.json
    def create
      @column = Column.new(column_params)
      @column.board = @board

      if @column.save
        render :show, status: :created
      else
        render json: @column.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /columns/1
    # PATCH/PUT /columns/1.json
    def update
      if @column.update(column_params)
        render :show, status: :ok
      else
        render json: @column.errors, status: :unprocessable_entity
      end
    end

    # DELETE /columns/1
    # DELETE /columns/1.json
    def destroy
      @column.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_column
        @column = Column.find_by(id: params[:id], board: @board)
      end

      def set_board
        @board = Board.find_by_link(params[:board_id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def column_params
        params.fetch(:column, {}).permit(:title)
      end
  end
end