type ScheduleItem = { month: number; year: number; status: "dolu" | "musait" | "yakin" };

const TR_MONTHS = [
  "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
  "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",
];

const STATUS_META = {
  dolu:   { label: "Dolu",         dot: "#c0392b" },
  yakin:  { label: "Dolmak Üzere", dot: "#B08A4F" },
  musait: { label: "Müsait",       dot: "#27ae60" },
};

export default function DeliveryCalendar({ schedule }: { schedule: ScheduleItem[] }) {
  return (
    <div className="delivery-cal">
      <p className="delivery-cal__head">Teslimat Takvimi</p>
      <div className="delivery-cal__table">
        {schedule.map((item) => {
          const meta = STATUS_META[item.status];
          return (
            <div key={`${item.month}-${item.year}`} className="delivery-cal__row">
              <span className="delivery-cal__month">
                {TR_MONTHS[item.month]} {item.year}
              </span>
              <span className="delivery-cal__dot" style={{ background: meta.dot }} />
              <span className="delivery-cal__label" style={{ color: meta.dot }}>
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="delivery-cal__cta">
        <span className="delivery-cal__cta-arrow">→</span>
        <span>
          {(() => {
            const available = schedule.find((s) => s.status === "musait");
            const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
            return available
              ? `Şimdi ön sipariş verin, ${months[available.month]} ${available.year}'da tekneniz kapınızda olsun`
              : "Ön sipariş verdiğinizde teslimat tarihinizi birlikte netleştiririz";
          })()}
        </span>
      </div>
    </div>
  );
}
