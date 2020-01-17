module APIHelpers
  module SessionHelper
    
    def set_session_visitor
      get_visitor_session
      if @visitor_session
        customer_uid = params[:uid]
        abt_uid = params[:abt_uid]

        if !customer_uid.blank?
          if @visitor_session.visitor.customer_uid != customer_uid
            @visitor_session.visitor.customer_uid = customer_uid
          end
        end
        if !abt_uid.blank?
          if @visitor_session.visitor.abt_uid != abt_uid
            @visitor_session.visitor.abt_uid = abt_uid
          end
        end  

        @visitor_session.save
      end
    end

    def get_visitor_session
      return @visitor_session if @visitor_session
      
      sid = params[:sid]
      isValidUUID = UUID.validate(sid)
      if isValidUUID
        @visitor_session = VisitorSession.find_or_create_by({uuid: sid})
      else
        @visitor_session = nil
      end
      @visitor_session
    end

  end
end