class Comment < ApplicationRecord

    belongs_to :user
    belongs_to(:post)

    #make the presence of body text mandatory
    validates :body, presence: true

end
