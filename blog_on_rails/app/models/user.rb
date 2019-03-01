class User < ApplicationRecord

    has_many :comments
    has_many :posts

    has_secure_password
    #this provides user authentication with bycrpt
 
    validates :email, presence: true,
                    uniqueness: true,
                    format: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

    validates :first_name, presence: true

    validates :last_name, presence: true

 
    def full_name
        "#{first_name} #{last_name}".strip
    end
 

end
