class Api::V1::TablesController < ApplicationController

  def index
    tables = Table.all
    render json: tables, only: [:id, :name, :email, :phone], status: 200
  end

  def create
    table = Table.new(
      id: table_params[:id],
      name: table_params[:name],
      email: table_params[:email],
      phone: table_params[:phone]
    )
    if table.save
      render json: table, status: 200
    else
      render json: {error: "Error creating review"}
    end
  end

  def show
    @table = Table.find_by(id: params[:id])
    if @table
      render json: @table, status: 200
    else
      render json: {error: "Product not found"}
    end
  end

  def update
    @table = Table.find(params[:id])
    if @table
      @table.update(table_params)
      render json: { message: 'Table successfully updated',data:@user},status: 200
    else
      render json: { error: 'Unable to update'},status: 400
    end
  end

  def destroy
    @table = Table.find(params[:id])
    if @user
      @user.destroy
      render json: { message: 'Table deleted sucessfully'},status: 200
    else
      render json: { error: 'Unable to delete'},status: 400
    end

  end


  private
    def table_params
      params.permit([
        :name,
        :email,
        :phone
      ])
    end
end
