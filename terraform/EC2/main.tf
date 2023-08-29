# ------------------------------- PROVIDER -------------------------------
provider "aws" {
    region = "eu-west-3"
    access_key = var.access_key
    secret_key = var.secret_key
}
# ------------------------------- PROVIDER -------------------------------


# ------------------------------- VARIABLES -------------------------------
variable vpc_cider_block {}

variable subnet_cider_block {}

variable avail_zones {}

variable env_prefix {}

variable my_ip {}

variable instance_image {}

variable instance_type {}

variable key_name {}

variable access_key {}

variable secret_key {}

# ------------------------------- VARIABLES -------------------------------


# ------------------------------- RESOURCES -------------------------------
# Custom vpc for dev env
resource "aws_vpc" "myapp-vpc" {
  cidr_block = var.vpc_cider_block
  tags = {
    Name = "${var.env_prefix[0]}-vpc"
  }
}

# internet gateway to route requests to global network
resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.myapp-vpc.id

    tags = {
        Name: "${var.env_prefix[0]}-igw"
    }

}

#  route table responsible for routing traffic to the subnets
resource "aws_route_table" "private_route_table" {
    vpc_id = aws_vpc.myapp-vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }

    tags = {
        Name: "${var.env_prefix[0]}-rtb"
    }
}

# subnet is the container that holds the ec2 instance isnide it
resource "aws_subnet" "subnet-1" {
  vpc_id            = aws_vpc.myapp-vpc.id
  cidr_block        = var.subnet_cider_block
  availability_zone = var.avail_zones

  tags = {
    Name = "${var.env_prefix[0]}-subnet"
  }
}

# route table association responsible for association between 
# route table and subnet as the two resources are not connceted
resource "aws_route_table_association" "rtb-association" {
    subnet_id = aws_subnet.subnet-1.id 
    route_table_id = aws_route_table.private_route_table.id
}

# aws EC2 instance 
resource "aws_instance" "my-app-server" {
    ami               = var.instance_image
    instance_type     = var.instance_type
    
    availability_zone = var.avail_zones
    key_name          = var.key_name
    subnet_id = aws_subnet.subnet-1.id
    vpc_security_group_ids = [ aws_security_group.myapp-sg.id]

    associate_public_ip_address = true
    
    #  bash script for automating deploying process
    user_data =  "${file("dockerRun.sh")}" 


    tags = {
        Name = "${var.env_prefix[0]}-app"
    }
}

# Security group custom made firewall
resource "aws_security_group" "myapp-sg" {
    name = "myapp-sg"
    vpc_id = aws_vpc.myapp-vpc.id
    
    # ingress --> inbound filter
    ingress {
        description = "SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = [var.my_ip]
    }

    ingress {
        description = "HTTP"
        from_port   = 3000
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    # egress --> outbound filter
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        prefix_list_ids = []
    }

    tags = {
        Name = "${var.env_prefix[0]}-sg"
    }
}

# ------------------------------- RESOURCES -------------------------------



# -------------------------------- OUTPUTS --------------------------------

output "server_ip" {
  value = aws_instance.my-app-server.public_ip
}
# -------------------------------- OUTPUTS --------------------------------
