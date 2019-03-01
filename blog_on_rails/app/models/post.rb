class Post < ApplicationRecord

    belongs_to :user

    # adds methods like Post.comments to the model class
    has_many(:comments, dependent: :destroy)

    validates(:title, presence: true, uniqueness: true)
    validates(:body, presence: true, length: { minimum: 50})
    
end
