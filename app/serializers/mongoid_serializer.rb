class MongoidSerializer < ActiveModel::Serializer

  def id
    object.id.to_s
  end

  def pclient_id
    object.pclient_id.to_s
  end
end
