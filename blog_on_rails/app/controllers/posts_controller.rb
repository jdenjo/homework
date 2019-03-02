class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :welcome]
  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, only: [:destroy, :edit, :update]

  def index
    @posts = Post.all.order(created_at: :desc)
  end

  def new
    @post = Post.new
  end

  def show
    @post = Post.find(params[:id])
    @comment = Comment.new
    @comments = @post.comments.order(created_at: :desc)
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    flash[:success] = "Post deleted successfully"
    redirect_to posts_path
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new params.require(:post).permit(:title, :body)
    @post.user = current_user
    if @post.save
      flash[:success] = "Post created successfully"
      redirect_to post_path(@post.id)
    else
      render :new
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update params.require(:post).permit(:title, :body)
      flash[:success] = "Post updated successfully"
      redirect_to post_path(@post.id)
    else
      flash[:danger] = "Post not updated"
      render :edit
    end
  end

  def welcome
    puts "got here"
  end

  private

  def authorize_user!
    redirect_to root_path, alert: "access denied" unless can? :crud, @post
  end

  def find_post
    @post = Post.find(params[:id])
  end
end
