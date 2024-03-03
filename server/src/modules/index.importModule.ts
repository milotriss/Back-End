import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { OrderitemModule } from "./orderitem/orderitem.module";
import { PaymentModule } from "./payment/payment.module";
import { ProductModule } from "./product/product.module";
import { RateModule } from "./rate/rate.module";
import { UserModule } from "./user/user.module";

export const moduleImport = [UserModule,ProductModule,OrderitemModule,FeedbackModule,AuthModule,PaymentModule,RateModule,AdminModule]