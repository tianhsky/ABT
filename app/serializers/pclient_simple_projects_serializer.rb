class PclientSimpleProjectsSerializer < MongoidSerializer
  attributes :id, :name

  has_many :projects, serializer: SimpleProjectSerializer
end
