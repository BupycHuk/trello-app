class Api::TasksController < ApiController
  before_action :set_api_task, only: [:show, :update, :destroy]

  # GET /api/tasks/1
  # GET /api/tasks/1.json
  def show
  end

  # POST /api/tasks
  # POST /api/tasks.json
  def create
    @api_task = Task.new(api_task_params)

    if @api_task.save
      render :show, status: :created
    else
      render json: @api_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/tasks/1
  # PATCH/PUT /api/tasks/1.json
  def update
    if @api_task.update(api_task_params)
      render :show, status: :ok
    else
      render json: @api_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/tasks/1
  # DELETE /api/tasks/1.json
  def destroy
    @api_task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_task
      @api_task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def api_task_params
      params.fetch(:task, {}).permit(:title, :column_id)
    end
end
