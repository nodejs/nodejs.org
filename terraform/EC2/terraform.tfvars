vpc_cider_block = "10.0.0.0/16" # local network between all subnets inside vpc

subnet_cider_block = "10.0.0.0/24" # allow global access

avail_zones = "eu-west-3b" # availibality zones for deployment

env_prefix = ["dev-node-app", "prod-node-app"] # VPC environments

my_ip = "192.168.52.129"

instance_image = "ami-05b5a865c3579bbc4"

instance_type = "t2.micro"

key_name = "connection"

image_tag_mutability  = "MUTABLE"

access_key = ""

secret_key = ""
