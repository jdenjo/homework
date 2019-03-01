class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :find_comment, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, only: [:destroy, :edit, :update]

  def create
    @post = Post.find params[:post_id]
    @comment = Comment.new post_params
    @comment.post = @post
    @comment.user = current_user
    if @comment.save
      redirect_to post_url(@post.id)
    else
      @comments = @post.comments.order(created_at: :desc)
      render "posts/show"
    end
  end

  def destroy
    @comment = Comment.find params[:id]
    @comment.destroy
    redirect_to post_url(@comment.post)
  end

  private

  #this is a private method that takes the form inputs
  def post_params
    params.require(:comment).permit(:body)
  end

  def authorize_user!
    redirect_to root_path, alert: "access denied" unless can? :crud, @comment
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end
end
