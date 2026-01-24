export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_id: string | null
          content_ar: string
          content_bn: string | null
          content_de: string | null
          content_en: string
          content_es: string | null
          content_fr: string | null
          content_hi: string | null
          content_it: string | null
          content_nl: string | null
          content_pl: string | null
          content_pt: string | null
          content_ru: string | null
          content_tr: string | null
          content_ur: string | null
          content_zh: string | null
          created_at: string
          excerpt_ar: string | null
          excerpt_en: string | null
          featured_image: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title_ar: string
          title_bn: string | null
          title_de: string | null
          title_en: string
          title_es: string | null
          title_fr: string | null
          title_hi: string | null
          title_it: string | null
          title_nl: string | null
          title_pl: string | null
          title_pt: string | null
          title_ru: string | null
          title_tr: string | null
          title_ur: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content_ar: string
          content_bn?: string | null
          content_de?: string | null
          content_en: string
          content_es?: string | null
          content_fr?: string | null
          content_hi?: string | null
          content_it?: string | null
          content_nl?: string | null
          content_pl?: string | null
          content_pt?: string | null
          content_ru?: string | null
          content_tr?: string | null
          content_ur?: string | null
          content_zh?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title_ar: string
          title_bn?: string | null
          title_de?: string | null
          title_en: string
          title_es?: string | null
          title_fr?: string | null
          title_hi?: string | null
          title_it?: string | null
          title_nl?: string | null
          title_pl?: string | null
          title_pt?: string | null
          title_ru?: string | null
          title_tr?: string | null
          title_ur?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content_ar?: string
          content_bn?: string | null
          content_de?: string | null
          content_en?: string
          content_es?: string | null
          content_fr?: string | null
          content_hi?: string | null
          content_it?: string | null
          content_nl?: string | null
          content_pl?: string | null
          content_pt?: string | null
          content_ru?: string | null
          content_tr?: string | null
          content_ur?: string | null
          content_zh?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title_ar?: string
          title_bn?: string | null
          title_de?: string | null
          title_en?: string
          title_es?: string | null
          title_fr?: string | null
          title_hi?: string | null
          title_it?: string | null
          title_nl?: string | null
          title_pl?: string | null
          title_pt?: string | null
          title_ru?: string | null
          title_tr?: string | null
          title_ur?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          description: string | null
          file_type: string
          file_url: string
          id: string
          title: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_type: string
          file_url: string
          id?: string
          title: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_type?: string
          file_url?: string
          id?: string
          title?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_ar: string | null
          content_bn: string | null
          content_de: string | null
          content_en: string | null
          content_es: string | null
          content_fr: string | null
          content_hi: string | null
          content_it: string | null
          content_key: string
          content_nl: string | null
          content_pl: string | null
          content_pt: string | null
          content_ru: string | null
          content_tr: string | null
          content_type: string
          content_ur: string | null
          content_zh: string | null
          created_at: string
          id: string
          media_url: string | null
          section_id: string
          updated_at: string
        }
        Insert: {
          content_ar?: string | null
          content_bn?: string | null
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fr?: string | null
          content_hi?: string | null
          content_it?: string | null
          content_key: string
          content_nl?: string | null
          content_pl?: string | null
          content_pt?: string | null
          content_ru?: string | null
          content_tr?: string | null
          content_type?: string
          content_ur?: string | null
          content_zh?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          section_id: string
          updated_at?: string
        }
        Update: {
          content_ar?: string | null
          content_bn?: string | null
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fr?: string | null
          content_hi?: string | null
          content_it?: string | null
          content_key?: string
          content_nl?: string | null
          content_pl?: string | null
          content_pt?: string | null
          content_ru?: string | null
          content_tr?: string | null
          content_type?: string
          content_ur?: string | null
          content_zh?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          section_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "page_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_visible: boolean
          page_slug: string
          section_type: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          page_slug: string
          section_type: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          page_slug?: string
          section_type?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_type: string
          created_at: string
          id: string
          ip_address: string
          request_count: number
          window_start: string
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          ip_address: string
          request_count?: number
          window_start?: string
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          ip_address?: string
          request_count?: number
          window_start?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description_ar: string
          description_bn: string | null
          description_de: string | null
          description_en: string
          description_es: string | null
          description_fr: string | null
          description_hi: string | null
          description_it: string | null
          description_nl: string | null
          description_pl: string | null
          description_pt: string | null
          description_ru: string | null
          description_tr: string | null
          description_ur: string | null
          description_zh: string | null
          display_order: number
          features: Json | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          price: number | null
          price_max: number | null
          price_min: number | null
          pricing_type: string | null
          slug: string
          title_ar: string
          title_bn: string | null
          title_de: string | null
          title_en: string
          title_es: string | null
          title_fr: string | null
          title_hi: string | null
          title_it: string | null
          title_nl: string | null
          title_pl: string | null
          title_pt: string | null
          title_ru: string | null
          title_tr: string | null
          title_ur: string | null
          title_zh: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description_ar: string
          description_bn?: string | null
          description_de?: string | null
          description_en: string
          description_es?: string | null
          description_fr?: string | null
          description_hi?: string | null
          description_it?: string | null
          description_nl?: string | null
          description_pl?: string | null
          description_pt?: string | null
          description_ru?: string | null
          description_tr?: string | null
          description_ur?: string | null
          description_zh?: string | null
          display_order?: number
          features?: Json | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          price?: number | null
          price_max?: number | null
          price_min?: number | null
          pricing_type?: string | null
          slug: string
          title_ar: string
          title_bn?: string | null
          title_de?: string | null
          title_en: string
          title_es?: string | null
          title_fr?: string | null
          title_hi?: string | null
          title_it?: string | null
          title_nl?: string | null
          title_pl?: string | null
          title_pt?: string | null
          title_ru?: string | null
          title_tr?: string | null
          title_ur?: string | null
          title_zh?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description_ar?: string
          description_bn?: string | null
          description_de?: string | null
          description_en?: string
          description_es?: string | null
          description_fr?: string | null
          description_hi?: string | null
          description_it?: string | null
          description_nl?: string | null
          description_pl?: string | null
          description_pt?: string | null
          description_ru?: string | null
          description_tr?: string | null
          description_ur?: string | null
          description_zh?: string | null
          display_order?: number
          features?: Json | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          price?: number | null
          price_max?: number | null
          price_min?: number | null
          pricing_type?: string | null
          slug?: string
          title_ar?: string
          title_bn?: string | null
          title_de?: string | null
          title_en?: string
          title_es?: string | null
          title_fr?: string | null
          title_hi?: string | null
          title_it?: string | null
          title_nl?: string | null
          title_pl?: string | null
          title_pt?: string | null
          title_ru?: string | null
          title_tr?: string | null
          title_ur?: string | null
          title_zh?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
