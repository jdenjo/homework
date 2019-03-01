class UsersController < ApplicationController

    def new
        @user = User.new
    end

    def update
      @user = User.find(params[:id])

      if @user.update params.require(:user).permit(:first_name, :last_name, :email)
        flash[:notice] = "Login details updated"
        render :edit
      else
        render :edit
      end
    end

    def password
      @user = User.find(session[:user_id])

    end

    def password_post
      @user = User.find(session[:user_id])
      
      print @user

      if @user&.authenticate(params[:old_password])

        if (params[:password] == params[:password_confirmation])     
      
          @user.password = params[:password] 
          if @user.save 
            flash[:notice] = "password updated successully"
            redirect_to edit_user_path
          else
            flash[:notice] = "password not updated sucessfully"
            redirect_to password_post_path
          end
        else
          flash[:notice] = "new passwords dont match"
          redirect_to password_post_path
        end
      else
        flash[:notice] = "current password incorrect"
        redirect_to password_post_path
      end
    
    end


    def edit
      @user = User.find(session[:user_id])

    end

     
      def create
        @user = User.new user_params
        if @user.save
          session[:user_id] = @user.id
          redirect_to root_path
        else
          render :new
        end
      end
     
      private
     
      def user_params
        params.require(:user).permit(
          :first_name, :last_name, :email, :password, :password_confirmation
        )
      end
     
end
