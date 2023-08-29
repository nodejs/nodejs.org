# ------------------------------- PROVIDER -------------------------------
provider "aws" {
    region = "eu-west-3"
    access_key = var.access_key
    secret_key = var.secret_key
}
# ------------------------------- PROVIDER -------------------------------


# ------------------------------- VARIABLES -------------------------------
variable image_tag_mutability {}

variable env_prefix {}

variable access_key {}

variable secret_key {}
# ------------------------------- VARIABLES -------------------------------


# ------------------------------- RESOURCES -------------------------------

# Elastic container registry repository to push my containers to 
# and access the containers from
resource "aws_ecr_repository" "dev_repo" {
  name			= "${var.env_prefix[0]}-repo"
  image_tag_mutability  = var.image_tag_mutability

  tags = {
    Name = "${var.env_prefix[0]}-repo"
  }
}

# ------------------------------- RESOURCES -------------------------------



# -------------------------------- OUTPUTS --------------------------------

output "ecr_url" {
    value = try(aws_ecr_repository.dev_repo.repository_url,"")
}

# -------------------------------- OUTPUTS --------------------------------
