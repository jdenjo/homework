class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    if user.is_admin?
      can :manage, :all
    end

    alias_action :create, :read, :update, :destroy, to: :crud

    can :crud, Post, user_id: user.id

    can :crud, Comment do |comment|
      puts comment.user.id
      puts user.id
      comment.user.id == user.id || comment.post.user.id == user.id
    end
  end
end
